function SearchResult({
  title,
  authors,
  bookshelves,
  copyright,
  languages,
  subjects,
}) {
  return (
    <div className='card bg-base-200 shadow-lg'>
      <div className='card-body bg-base-300'>
        <h3 className='card-title text-lg'>
          {title.length < 200
            ? title
            : title.split(' ').splice(0, 20).join(' ') + '...'}
        </h3>
      </div>
      <div className='card-body'>
        <p>
          <strong>Author(s): </strong>
          {authors.length > 0
            ? authors.map((author) => author.name).join(' ')
            : 'Unknown'}
        </p>
        <p>
          <strong>Subjects(s): </strong>
          {subjects.length > 0 ? subjects.join(', ') : 'Unknown'}
        </p>
        <p>
          <strong>Bookshelves: </strong>
          {bookshelves.length > 0 ? bookshelves.join(', ') : 'Unknown'}
        </p>
        <p>
          <strong>Languages: </strong>
          {languages.length > 0 ? languages.join(', ') : 'Unknown'}
        </p>
        <p>
          <strong>Copyright: </strong>
          {copyright === true && 'Copyrighted'}
          {copyright === false && 'Not Copyrighted'}
          {copyright === null && 'Unknown'}
        </p>

        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
export default SearchResult;
