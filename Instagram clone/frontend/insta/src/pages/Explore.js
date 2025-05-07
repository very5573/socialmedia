import "../styles/pages/explore.css";

export default function Explore() {
  return (
    <div className="explore-grid">
      {[...Array(9)].map((_, i) => (
        <img key={i} src={`https://source.unsplash.com/random/300x300?sig=${i}`} alt="explore" />
      ))}
    </div>
  );
}