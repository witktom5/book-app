function SearchResult({
  title,
  authors,
  bookshelves,
  copyright,
  languages,
  subjects,
}) {
  return (
    <div class='card bg-base-300 shadow-lg'>
      <div class='card-body'>
        <h3 class='card-title text-lg'>{title}</h3>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class='card-actions justify-end'>
          <button class='btn btn-primary'>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
export default SearchResult;
