function FavouriteBook({ title, authors, bookshelves, id }) {
  return (
    <div className='card bg-base-200 shadow-lg'>
      <div className='card-body bg-base-300'>
        <h3 className='card-title text-lg'>{title}</h3>
      </div>
      <div className='card-body'>
        <p>
          <strong>Author(s): </strong>
          {authors.length > 0
            ? authors.map((author) => author.name).join(' ')
            : 'Unknown'}
        </p>

        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
export default FavouriteBook;
