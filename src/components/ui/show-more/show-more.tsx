type ShowMoreProps = {
  isActive: boolean;
  onClick: () => void;
};

export default function ShowMore({ isActive, onClick }: ShowMoreProps) {
  return (
    <div
      className="catalog__more"
      onClick={onClick}
      style={{ display: !isActive ? 'none' : 'block' }}
      data-testid='showMore'
    >
      <button className="catalog__button" type="button">
        Show more
      </button>
    </div>
  );
}
