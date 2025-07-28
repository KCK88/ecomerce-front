export default function Stars({averageRating}:{averageRating: number}) {


  return (
    <div className="star-rating">
      {[...Array(5)].map((_star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={index <=  averageRating ? "text-amber-400" : 'text-stone-300'}
          >
            <span>&#9733;</span> {/* Unicode star */}
          </span>
        );
      })}
    </div>
  );
};

