interface ForecastResponse {

    current: {
        temp_c: number,
        condition: { icon: string, text: string },
    }

    forecast: {
        forecastday: {
            day:
            {
                maxtemp_c: number,
                mintemp_c: number
            },
            hour: {

                condition: { icon: string, text: string },
                temp_c: number
            }[]
        }[];
    };
}