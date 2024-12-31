
export { default } from 'next-auth/middleware'

 export const config = {
    matcher : [
       '/',
       '/issues/list',
       '/issues/:id',
       '/issues/new',
       '/issues/:id/edit',
        
    ]
     
}

//  '/:id*',