import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { LocationService } from 'src/location/location.service';
import { ComplexDTO } from 'src/models/complex.dto';
import { Complex } from 'src/models/complex.entity';
import { Court } from 'src/models/court.entity';
import { TermsService } from 'src/terms/terms.service';
import { QueryFeature } from 'src/Utils/QueryFeature';
import { In, Not, Repository } from 'typeorm';

@Injectable()
export class ComplexService {

    constructor(
        @InjectRepository(Complex) private readonly complexRepository: Repository<Complex>,
        @InjectRepository(Court) private readonly courtRepository: Repository<Court>,
        @Inject(forwardRef(() => TermsService)) private readonly termsService: TermsService,
        @Inject() private readonly locationService: LocationService
    ) { }

    async getAll(query: Record<string, any>) {

        return await new QueryFeature(this.complexRepository, query).execute().query
    }

    async getById(id: number) {

        let complex = await this.complexRepository
            .createQueryBuilder('complex')
            .leftJoin('complex.owner', 'users')
            .addSelect(['users.phone', 'users.email'])
            .where('complex.id=:id', { id }).getOne();

        if (complex === null)
            throw new NotFoundException("Complex not found")

        return complex;
    }

    // async getByIdd(id: number[]) {
    //     return await this.complexRepository.find({
    //         where: {
    //             id: In(id)
    //         }
    //     })
    // }

    async getByUser(owner: number) {
        return await this.complexRepository.findBy({ owner })
    }

    async create(complexDTO: ComplexDTO) {

        let { location: loc } = complexDTO;
        loc = loc.slice(1, loc.length - 1);
        let [lat, lng] = loc.split(",");

        let location = await this.locationService.reverseGeoCoding(+lat, +lng);

        complexDTO.city = location.city;
        complexDTO.country = location.country;

        const entity = this.complexRepository.create(complexDTO);
        const saved = await this.complexRepository.save(entity);
        return await this.complexRepository.findOne({ where: { id: saved.id } });
    }

    async edit(id: number, complexDTO: ComplexDTO) {
        if (!complexDTO)
            return new BadRequestException('Please insert a valid data to edit');

        const updateData: Partial<Complex> = {};

        if (complexDTO.open_time !== undefined) updateData.open_time = complexDTO.open_time;
        if (complexDTO.close_time !== undefined) updateData.close_time = complexDTO.close_time;
        if (complexDTO.location !== undefined) updateData.location = complexDTO.location;
        if (complexDTO.name !== undefined) updateData.name = complexDTO.name;
        if (complexDTO.city !== undefined) updateData.city = complexDTO.city
        if (complexDTO.country !== undefined) updateData.country = complexDTO.country

        const court = await this.complexRepository.update({ id, owner: complexDTO.owner }, updateData);

        if (court.affected == 0)
            throw new NotFoundException('Court not found');

        return updateData

    }

    async freeCourts(id: number, start: string, count: number, date: Date,) {
        date.setHours(0, 0, 0, 0);
        const startTime = start;
        const endTime = (count + parseInt(start.split(":")[0])).toString().padStart(2, '0') + ":00:00";

        const res: { all: Court[]; available: number[] } = {
            all: [],
            available: []
        };

        const courts = await this.courtRepository.find({
            where: { complex: { id } },
        });

        if (courts.length == 0)
            return [];

        res.all = courts;

        for (const court of courts) {
            try {
                await this.termsService.isTermFree(startTime, endTime, date, court.id)
                res.available.push(court.id)
            }
            catch (e) {

            }
        }

        return res;
    }

    async complexPhoto(file: Express.Multer.File, id: number) {

        const updateData: Partial<Complex> = {};
        updateData.photo = "complex/" + file.filename;

        const update = await this.complexRepository.update({ id }, updateData);

        if (update.affected == 0)
            throw new NotFoundException("User photo doesn't changed");

        return {
            message: 'You are successfully uploaded profile photo',
            filename: file.filename,
            path: `complex/${file.filename}`,
        };
    }

    async editPrice(id: number, price: number) {

        const complex = await this.complexRepository.findOneBy({ id });

        if (!complex) throw new Error("Complex not found");

        console.log(complex);

        if (price < complex.priceMin || price > complex.priceMax) {
            complex.priceMin = complex.priceMin === 0 ? price : Math.min(complex.priceMin, price);
            complex.priceMax = Math.max(complex.priceMax, price);

            // @ts-ignore
            delete complex.location;
            await this.complexRepository.save(complex);
        }
    }

    async updateVote(id: number, rating: number, old: number) {

        const complex = await this.complexRepository.findOneBy({ id });

        if (!complex) throw new NotFoundException("Complex not found");

        if (old == 0) {
            complex.votes += 1;
            complex.rating += rating;
        }
        else {
            complex.rating = complex.rating + old + rating;
        }

        await this.complexRepository.update(id, {
            rating: complex.rating,
            votes: complex.votes
        });
    }

}
