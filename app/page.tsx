
"use client";

import { useMemo, useState } from "react";

const movies = [
  {
    id: 1,
    title: "حارس الأهرام",
    category: "مغامرة",
    year: "2026",
    description: "رحلة سينمائية غامضة في عالم الأسرار والحضارات القديمة.",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800",
  },
  {
    id: 2,
    title: "آخر ملوك الصحراء",
    category: "تاريخي",
    year: "2026",
    description: "حكاية ملحمية عن السلطة والشجاعة والصراع.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
  },
  {
    id: 3,
    title: "المستقبل المظلم",
    category: "خيال علمي",
    year: "2026",
    description: "عندما يتغير العالم وتصبح التكنولوجيا لغزاً.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
  },
  {
    id: 4,
    title: "رحلة إلى المجهول",
    category: "مغامرة",
    year: "2026",
    description: "مغامرة تتجاوز حدود الخيال.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
  },
  {
    id: 5,
    title: "المدينة الأخيرة",
    category: "دراما",
    year: "2026",
    description: "قصة إنسانية في مدينة لا تنام.",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800",
  },
  {
    id: 6,
    title: "أسرار المملكة",
    category: "تاريخي",
    year: "2026",
    description: "أسرار قديمة تعود إلى الظهور.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
  },
];

const categories = ["الكل", "تاريخي", "مغامرة", "دراما", "خيال علمي"];

export default function Home() {
  const [category, setCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<(typeof movies)[number] | null>(null);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesCategory =
        category === "الكل" || movie.category === category;
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <main>
      <header className="navbar">
        <a className="logo" href="#">
          <span>SD</span> سينما
        </a>

        <nav>
          <a href="#">الرئيسية</a>
          <a href="#movies">الأفلام</a>
          <a href="#about">من نحن</a>
        </nav>

        <div className="nav-tag">عالمك السينمائي</div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">مرحباً بك في عالم سينما SD</span>
          <h1>
            قصص تستحق
            <br />
            <span>أن تُشاهد</span>
          </h1>
          <p>
            اكتشف عالماً من الأفلام والمسلسلات والإنتاجات
            السينمائية الأصلية.
          </p>
          <a href="#movies" className="primary-btn">
            اكتشف الأفلام ←
          </a>
        </div>
        <div className="hero-mark">SD</div>
      </section>

      <section className="catalog" id="movies">
        <div className="section-heading">
          <div>
            <span className="eyebrow">مكتبة سينما SD</span>
            <h2>اكتشف عالم الأفلام</h2>
          </div>
          <span className="count">{filteredMovies.length} أفلام</span>
        </div>

        <input
          className="search"
          type="search"
          placeholder="ابحث عن فيلم..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "chip active" : "chip"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <article className="movie-card" key={movie.id}>
              <button
                className="poster-button"
                onClick={() => setSelected(movie)}
                aria-label={`تفاصيل ${movie.title}`}
              >
                <img src={movie.image} alt={movie.title} />
                <span className="play-icon">▶</span>
                <span className="poster-label">SD ORIGINAL</span>
              </button>
              <div className="movie-info">
                <div>
                  <h3>{movie.title}</h3>
                  <p>{movie.category} · {movie.year}</p>
                </div>
                <button
                  className="details-btn"
                  onClick={() => setSelected(movie)}
                >
                  التفاصيل
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <p className="empty">لم نعثر على أفلام مطابقة لبحثك.</p>
        )}
      </section>

      <section className="about" id="about">
        <span className="eyebrow">قصص من الخيال إلى الشاشة</span>
        <h2>سينما SD</h2>
        <p>
          منصة مخصصة لعرض الأفلام والمسلسلات والإنتاجات السينمائية
          الأصلية المصنوعة بإبداع.
        </p>
      </section>

      <footer>
        <a className="logo" href="#"><span>SD</span> سينما</a>
        <p>© 2026 سينما SD - جميع الحقوق محفوظة</p>
      </footer>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img src={selected.image} alt={selected.title} />
            <div className="modal-content">
              <span className="eyebrow">SD ORIGINAL</span>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <span>{selected.category} · {selected.year}</span>
              <p className="coming-soon">
                سيتم إضافة رابط المشاهدة عند رفع الفيلم.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
