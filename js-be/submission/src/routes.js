const {
  addBookHandler,
  getAllBookHandler,
  getAllBookByIdHandler
}=require('./handler');

const routes=[
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getAllBookByIdHandler,
  },
];

module.exports=routes;
