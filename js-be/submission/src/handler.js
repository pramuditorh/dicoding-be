/* eslint-disable max-len */
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

  if (!name) {
    const response=h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage>pageCount) {
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

  if (isSuccess) {
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

const getAllBookHandler=(request, h) => {
  const params=request.query;

  if (params.name!==undefined) {
    const name=params.name.toLowerCase();
    const bookByName=books.filter((book) => book.name.toLowerCase().includes(name));

    const response=h.response({
      status: 'success',
      data: {
        books: bookByName.map((element) => ({
          id: element.id,
          name: element.name,
          publisher: element.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  if (params.reading!==undefined) {
    if (params.reading==='0') {
      const bookByReading=books.filter((book) => book.reading===false);

      const response=h.response({
        status: 'success',
        data: {
          books: bookByReading.map((element) => ({
            id: element.id,
            name: element.name,
            publisher: element.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }

    if (params.reading==='1') {
      const bookByReading=books.filter((book) => book.reading===true);

      const response=h.response({
        status: 'success',
        data: {
          books: bookByReading.map((element) => ({
            id: element.id,
            name: element.name,
            publisher: element.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
  }

  if (params.finished!==undefined) {
    if (params.finished==='0') {
      const bookByFinished=books.filter((book) => book.finished===false);

      const response=h.response({
        status: 'success',
        data: {
          books: bookByFinished.map((element) => ({
            id: element.id,
            name: element.name,
            publisher: element.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }

    if (params.finished==='1') {
      const bookByFinished=books.filter((book) => book.finished===true);

      const response=h.response({
        status: 'success',
        data: {
          books: bookByFinished.map((element) => ({
            id: element.id,
            name: element.name,
            publisher: element.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
  }

  const response=h.response({
    status: 'success',
    data: {
      books: books.map((element) => ({
        id: element.id,
        name: element.name,
        publisher: element.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getAllBookByIdHandler=(request, h) => {
  const id=request.params.bookId;
  const book=books.filter((book) => book.id===id)[0];

  if (book!==undefined) {
    return {
      status: 'success',
      data: {
        book: book,
      },
    };
  }

  const response=h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler=(request, h) => {
  const id=request.params.bookId;
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
  const finished=pageCount===readPage;
  const updatedAt=new Date().toISOString();
  const bookIndex=books.findIndex((book) => book.id===id);

  if (!name) {
    const response=h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage>pageCount) {
    const response=h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (!id) {
    const response=h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  if (bookIndex!==-1) {
    books[bookIndex]={
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };
    const response=h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response=h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler=(request, h) => {
  const id=request.params.bookId;
  const bookIndex=books.findIndex((book) => book.id===id);

  if (bookIndex!==-1) {
    books.splice(bookIndex, 1);
    const response=h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response=h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports={
  addBookHandler,
  getAllBookHandler,
  getAllBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
