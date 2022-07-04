const {nanoid}=require('nanoid');
const books=require('./books');

const addBookHandler=(request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }=request.payload;

  const id=nanoid(16);
  const finished=pageCount===readPage;
  const insertedAt=new Date().toISOString();
  const updatedAt=insertedAt;

  const newBook={
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if(!name) {
    const response=h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if(readPage>pageCount) {
    const response=h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess=books.filter((note) => note.id===id).length>0;

  if(isSuccess) {
    const response=h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response=h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};

const getAllBookHandler=() => ({
  status: 'success',
  data: {
    books,
  },
});

const getAllBookByIdHandler=(request, h) => {
  const id=request.params.bookId;
  const book=books.filter((book) => book.id===id)[0];

  if(book!==undefined) {
    return {
      status: 'success',
      data: book
    }
  }

  const response=h.response({
    stats: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404);
  return response
}

module.exports={
  addBookHandler,
  getAllBookHandler,
  getAllBookByIdHandler
};
