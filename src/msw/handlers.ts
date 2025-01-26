import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/v1/statistics', () => {
        return HttpResponse.json(
          {
            statistics:[
                {
                    count:8098,
                    title:'Todays Bookings'
                },
                {
                    count:8098,
                    title:'Yesterday Bookings'
                },
                {
                    count:8098,
                    title:'Tommorow Bookings'
                }
            ]
          }
        )
      }),
];
