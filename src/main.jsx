import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

const products = [
  ["Lumen Signet Ring", "Rings", "Sterling silver", "Clear quartz", 42000, "52 54 56 58 60", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85", "New"],
  ["Mica Oval Ring", "Rings", "Gold vermeil", "Moonstone", 52000, "50 52 54 56 58", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85", ""],
  ["Deep Moss Ring", "Rings", "Sterling silver", "Green agate", 48000, "54 56 58 60 62", "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=85", ""],
  ["Column Ring Slim", "Rings", "White gold", "White sapphire", 64000, "48 50 52 54 56", "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85", "New"],
  ["Trace Stone Necklace", "Necklaces", "White gold", "White sapphire", 68000, "16 inches 18 inches 20.5 inches", "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85", ""],
  ["Small Orbit Necklace", "Necklaces", "Gold vermeil", "Smoky quartz", 39000, "15 inches 17 inches 20.5 inches", "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85", ""],
  ["Narrow Chain Necklace", "Necklaces", "Sterling silver", "Onyx", 46000, "17 inches 20.5 inches 24.5 inches", "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=85", ""],
  ["Still Drop Earrings", "Earrings", "Sterling silver", "Blue topaz", 36000, "Onesize", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85", "New"],
  ["Pearl Stone Ear Cuff", "Earrings", "Gold vermeil", "Freshwater pearl", 28000, "Onesize", "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85", ""],
  ["Small Halo Hoops", "Earrings", "White gold", "Lab stone", 44000, "Onesize", "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=85", ""],
  ["Column Bracelet", "Bracelets", "Sterling silver", "Onyx", 44000, "6.5 inches 7.0 inches 7.7 inches", "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85", ""],
  ["Ada Stone Bracelet", "Bracelets", "Gold vermeil", "Moonstone", 57000, "6.0 inches 6.5 inches 7.0 inches", "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=85", "New"],
].map(([name, category, material, stone, price, sizes, image, badge]) => ({
  name,
  category,
  material,
  stone,
  price,
  sizes,
  image,
  badge,
}));

const collections = [
  ["Rings", "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=85"],
  ["Necklaces", "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1400&q=85"],
  ["Earrings", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1400&q=85"],
  ["Bracelets", "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1400&q=85"],
];

function useHashRoute() {
  const readRoute = () => window.location.hash.replace(/^#\/?/, "") || "home";
  const [route, setRoute] = useState(readRoute);

  React.useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const go = (next) => {
    window.location.hash = `#/${next}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [route, go];
}

function Header({ cartCount, openCart }) {
  return (
    <>
      <div className="flex min-h-8 items-center justify-center bg-deep px-4 py-2 text-xs text-white">
        Taxes included / Complimentary delivery on orders over ¥30,000
      </div>
      <header className="sticky top-0 z-30 grid min-h-16 grid-cols-[1fr_auto_1fr] items-center bg-transparent px-4 md:px-7">
        <nav className="flex items-center gap-5 text-[13px]">
          <button className="p-1" aria-label="Menu">☰</button>
          <a href="#/shop">Shop</a>
        </nav>
        <a className="font-serif text-2xl md:text-[28px]" href="#/home">W stone</a>
        <nav className="flex items-center justify-end gap-5 text-[13px]">
          <a className="hidden md:inline" href="#/shop">JP/JPY</a>
          <a className="hidden md:inline" href="#/shop">Wishlist</a>
          <button className="p-1" onClick={openCart}>Cart {cartCount}</button>
        </nav>
      </header>
    </>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <article className="min-w-0 bg-paper">
      <div className="group relative aspect-[1/1.2] overflow-hidden bg-[#e8e4dc]">
        <img className="h-full w-full scale-[1.02] object-cover mix-blend-multiply transition duration-300 group-hover:scale-[1.06]" src={product.image} alt={product.name} />
        {product.badge && <span className="absolute left-3 top-3 text-[11px] uppercase">{product.badge}</span>}
        <button className="absolute right-3 top-3 text-xl" aria-label={`${product.name}をウィッシュリストに追加`}>♡</button>
      </div>
      <div className="grid min-h-[138px] gap-2 p-4 text-sm">
        <strong className="font-medium">{product.name}</strong>
        <span className="text-xs leading-snug text-muted">{product.category} / {product.material} / {product.stone}</span>
        <span className="text-xs leading-snug text-muted">AVAILABLE IN SIZES {product.sizes}</span>
        <div className="mt-auto flex justify-between gap-3">
          <span>{yen.format(product.price)}</span>
          <button className="border-b border-transparent hover:border-ink focus-visible:border-ink" onClick={() => addToCart(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductGrid({ items, addToCart }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((product) => (
        <ProductCard key={product.name} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

function CartDrawer({ cart, open, close, go, removeFromCart }) {
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  return (
    <aside className={`fixed right-0 top-0 z-50 grid h-screen w-full max-w-[420px] grid-rows-[auto_1fr_auto] border-l border-line bg-paper transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-line p-5">
        <strong>Your cart</strong>
        <button className="text-3xl" onClick={close} aria-label="Close cart">×</button>
      </div>
      <div className="overflow-auto p-5">
        {!cart.length && <p>カートは空です。</p>}
        {cart.map((product, index) => (
          <div className="mb-4 grid grid-cols-[74px_1fr_auto] items-center gap-3" key={`${product.name}-${index}`}>
            <img className="h-[88px] w-[74px] object-cover" src={product.image} alt={product.name} />
            <div>
              <strong className="text-sm">{product.name}</strong>
              <p className="mt-1 text-xs text-muted">{product.stone}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm">{yen.format(product.price)}</span>
              <button
                className="grid h-7 w-7 place-items-center text-xl leading-none text-muted hover:text-ink"
                onClick={() => removeFromCart(index)}
                aria-label={`${product.name}をカートから削除`}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-line p-5">
        <div className="mb-4 flex justify-between">
          <span>Subtotal</span>
          <strong>{yen.format(total)}</strong>
        </div>
        <button className="btn w-full" onClick={() => { close(); go("checkout"); }}>Checkout</button>
      </div>
    </aside>
  );
}

function Home({ addToCart }) {
  return (
    <main>
      <section className="grid min-h-[calc(100vh-100px)] border-b border-line lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col justify-end px-5 py-12 md:px-[7vw] md:py-16">
          <p className="mb-5 text-xs uppercase text-muted">New collection / Quiet brilliance</p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[.92] md:text-[112px]">Jewelry with stones.</h1>
          <p className="my-8 max-w-lg leading-7 text-[#373737]">W stoneは、天然石の静かな表情を日常に添えるジュエリーブランド。凛としたフォルム、肌になじむ余白、長く身につけられる質感を大切にしています。</p>
          <div className="flex flex-wrap gap-3">
            <a className="btn" href="#/shop">新作を見る</a>
            <a className="btn-secondary" href="#/shop">コレクション</a>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden bg-[#d9d4c9] lg:min-h-[560px]">
          <img className="h-full w-full object-cover saturate-[.82]" src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1400&q=85" alt="Silver rings with gemstones" />
          <div className="absolute bottom-6 left-6 text-sm text-white drop-shadow">Stones for every day, crafted in quiet forms.</div>
        </div>
      </section>

      <section className="border-b border-line p-4 md:p-8">
        <div className="mb-7">
          <h2 className="font-serif text-4xl">New arrivals</h2>
        </div>
        <ProductGrid items={products.slice(0, 8)} addToCart={addToCart} />
      </section>

      <section className="border-b border-line px-4 py-12 md:px-8">
        <h2 className="font-serif text-4xl">Collections</h2>
        <div className="mt-8 grid gap-9 md:grid-cols-2 md:gap-x-6 md:gap-y-14">
          {collections.map(([name, image]) => (
            <a href={`#/shop?category=${name}`} key={name}>
              <img className="aspect-[1/1.18] w-full object-cover saturate-[.78]" src={image} alt={name} />
              <h3 className="pt-4 font-serif text-4xl md:text-5xl">{name}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="grid gap-10 border-b border-line bg-white px-5 py-12 md:grid-cols-[.9fr_1.1fr] md:px-[7vw]">
        <div>
          <p className="mb-4 text-xs uppercase text-muted">Journal / Craft note</p>
          <h2 className="font-serif text-4xl">石と共にある時間</h2>
          <p className="my-6 leading-8 text-muted">W stoneでは、石を装飾としてだけでなく、記憶や気配を宿すものとして扱います。シンプルな形の中に、色の揺らぎや光の重なりが残るよう、素材選びと仕上げを整えています。</p>
          <a className="btn-secondary" href="#/shop">Read more</a>
        </div>
        <img className="aspect-[1.35/1] w-full object-cover saturate-[.74]" src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1300&q=85" alt="Jewelry craft close up" />
      </section>
    </main>
  );
}

function ControlDrawer({ title, open, close, children, footer }) {
  return (
    <>
      <div className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={close} />
      <aside className={`fixed left-0 top-0 z-50 grid h-screen w-full max-w-[470px] grid-rows-[auto_1fr_auto] bg-white transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="relative flex min-h-[88px] items-center justify-center border-b border-[#ececec]">
          <h2 className="text-2xl font-bold uppercase tracking-wide">{title}</h2>
          <button className="absolute right-5 text-5xl font-thin" onClick={close}>×</button>
        </div>
        <div className="overflow-auto">{children}</div>
        {footer}
      </aside>
    </>
  );
}

function Shop({ addToCart }) {
  const query = new URLSearchParams(window.location.hash.split("?")[1] || "");
  const [category, setCategory] = useState(query.get("category") || "All");
  const [sort, setSort] = useState("featured");
  const [drawer, setDrawer] = useState(null);

  const visible = useMemo(() => {
    let list = products.filter((product) => {
      if (category === "New") return Boolean(product.badge);
      return category === "All" || product.category === category;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "new") list = [...list].sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)));
    return list;
  }, [category, sort]);

  const filterOptions = [["All", 12], ["Rings", 4], ["Necklaces", 3], ["Earrings", 3], ["Bracelets", 2], ["New", 4]];
  const sortOptions = [["featured", "Recommended"], ["new", "What's new"], ["high", "Price high to low"], ["low", "Price low to high"], ["az", "Alphabetically, A-Z"]];

  return (
    <main className="px-4 py-12 md:px-7 md:py-16">
      <h1 className="font-serif text-6xl leading-none md:text-[136px]">Products</h1>
      <div className="mb-7 mt-8 flex gap-2">
        <button className="filter-button" onClick={() => setDrawer("sort")}>Sort <span className="text-2xl">↕</span></button>
        <button className="filter-button" onClick={() => setDrawer("filter")}>Filter <span className="text-2xl">☷</span></button>
      </div>
      <ProductGrid items={visible} addToCart={addToCart} />
      <nav className="flex justify-center gap-4 py-9 text-sm"><span className="border-b border-ink">1</span><span>2</span><span>3</span><span>...</span><span>Next</span></nav>

      <ControlDrawer
        title="Filter"
        open={drawer === "filter"}
        close={() => setDrawer(null)}
        footer={(
          <div className="grid grid-cols-2 gap-3 border-t border-[#ececec] p-5">
            <button className="min-h-12 border border-[#aaa] font-bold uppercase tracking-wide text-muted" onClick={() => setCategory("All")}>Clear all</button>
            <button className="min-h-12 bg-ink font-bold uppercase tracking-wide text-white" onClick={() => setDrawer(null)}>View items</button>
          </div>
        )}
      >
        {filterOptions.map(([name, count]) => (
          <button key={name} className={`flex min-h-[74px] w-full items-center justify-between border-b border-[#ececec] px-7 text-left ${category === name ? "font-bold" : ""}`} onClick={() => setCategory(name)}>
            {name}<span>{count}</span>
          </button>
        ))}
      </ControlDrawer>

      <ControlDrawer
        title="Sort"
        open={drawer === "sort"}
        close={() => setDrawer(null)}
        footer={<div className="border-t border-[#ececec] p-5"><button className="min-h-12 w-full bg-ink font-bold uppercase tracking-wide text-white" onClick={() => setDrawer(null)}>View items</button></div>}
      >
        {sortOptions.map(([value, label]) => (
          <button key={value} className={`flex min-h-[74px] w-full items-center gap-4 border-b border-[#ececec] px-7 text-left ${sort === value ? "font-bold" : ""}`} onClick={() => setSort(value)}>
            <span className={`h-4 w-4 rounded-full border ${sort === value ? "border-[5px] border-ink" : "border-muted"}`} /> {label}
          </button>
        ))}
      </ControlDrawer>
    </main>
  );
}

function Checkout() {
  const product = products[0];
  return (
    <main className="min-h-screen bg-white">
      <header className="grid h-[86px] grid-cols-[1fr_auto_1fr] items-center border-b border-line px-5 md:px-8">
        <a className="col-start-2 font-serif text-3xl" href="#/home">W stone</a>
        <a className="justify-self-end text-2xl" href="#/shop">⌑</a>
      </header>
      <div className="grid min-h-[calc(100vh-86px)] lg:grid-cols-[1.08fr_.92fr]">
        <section className="px-5 py-8 md:px-[8vw] md:py-12">
          <div className="text-center">
            <p className="mb-4 text-sm font-bold text-muted">かんたん決済</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button className="min-h-[58px] bg-[#5433eb] text-2xl font-bold text-white">shop</button>
              <button className="min-h-[58px] bg-black text-2xl font-bold text-white">G Pay</button>
            </div>
          </div>
          <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-sm text-muted before:h-px before:bg-line after:h-px after:bg-line">または</div>
          <div className="mb-4 flex justify-between"><h1 className="text-xl font-bold">連絡先</h1><a className="border-b border-ink text-sm" href="#/checkout">ログイン</a></div>
          <CheckoutField label="メールアドレスまたは携帯電話番号" />
          <label className="my-4 flex items-center gap-3 text-sm"><input className="h-5 w-5 accent-ink" type="checkbox" defaultChecked />お得な情報をメールで受け取る</label>
          <h2 className="mb-4 mt-8 text-xl font-bold">お届け先</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <CheckoutField label="国 / 地域" value="日本" wide />
            <CheckoutField label="姓" />
            <CheckoutField label="名" />
            <CheckoutField label="郵便番号" />
            <CheckoutField label="都道府県" value="東京都" />
            <CheckoutField label="市区町村" wide />
            <CheckoutField label="住所" wide />
            <CheckoutField label="建物名、部屋番号など" wide />
            <CheckoutField label="電話番号" wide />
          </div>
          <h2 className="mb-4 mt-8 text-xl font-bold">配送方法</h2>
          <div className="border border-line p-4 text-sm text-muted">お届け先住所を入力すると、配送方法が表示されます。</div>
          <button className="mt-5 min-h-[58px] w-full bg-ink font-bold text-white">配送方法へ進む</button>
          <a className="mt-5 inline-block text-sm text-muted" href="#/shop">カートに戻る</a>
        </section>
        <aside className="order-first border-b border-line bg-[#fbfaf7] px-5 py-8 lg:order-none lg:border-b-0 lg:border-l lg:px-[6vw] lg:py-12">
          <div className="mb-7 grid grid-cols-[74px_1fr_auto] items-center gap-4">
            <div className="relative h-[74px] w-[74px] bg-[#e8e4dc]"><img className="h-full w-full object-cover mix-blend-multiply" src={product.image} alt={product.name} /><span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center bg-ink text-xs text-white">1</span></div>
            <div><strong>{product.name}</strong><p className="mt-1 text-sm text-muted">52 / {product.stone}</p></div>
            <strong>{yen.format(product.price)}</strong>
          </div>
          <div className="mb-7 grid grid-cols-[1fr_auto] gap-3"><input className="min-h-[58px] border border-line px-4" placeholder="クーポンコード" /><button className="border border-line bg-[#f0efec] px-5 text-muted">適用</button></div>
          <SummaryRow label="小計" value={yen.format(product.price)} />
          <SummaryRow label="送料" value="お届け先住所を入力する" muted />
          <div className="mt-6 flex items-baseline justify-between text-xl font-bold"><span>合計</span><span><small className="mr-2 text-sm font-normal text-muted">JPY</small>{yen.format(product.price)}</span></div>
        </aside>
      </div>
    </main>
  );
}

function CheckoutField({ label, value = "", wide = false }) {
  return (
    <label className={`relative block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="absolute left-3 top-2 text-[11px] text-muted">{label}</span>
      <input className="min-h-[58px] w-full border border-line px-3 pb-2 pt-6 focus:outline-2 focus:outline-ink" defaultValue={value} />
    </label>
  );
}

function SummaryRow({ label, value, muted }) {
  return <div className="my-4 flex justify-between gap-5 text-sm text-muted"><span>{label}</span><strong className={muted ? "font-normal text-muted" : "font-medium text-ink"}>{value}</strong></div>;
}

function Footer() {
  return (
    <footer className="grid gap-6 px-5 py-10 text-sm text-muted md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-8">
      <div><strong className="block text-ink">W stone</strong><span>with stones / 宝石と共に</span></div>
      <div><strong className="block text-ink">Shop</strong><a className="mt-2 block" href="#/shop">New arrivals</a><a className="mt-2 block" href="#/shop?category=Rings">Rings</a></div>
      <div><strong className="block text-ink">Service</strong><a className="mt-2 block" href="#/checkout">Shipping</a><a className="mt-2 block" href="#/checkout">Returns</a></div>
      <div><strong className="block text-ink">Social</strong><a className="mt-2 block" href="#/shop">Instagram</a><a className="mt-2 block" href="#/shop">Contact</a></div>
    </footer>
  );
}

function App() {
  const [route, go] = useHashRoute();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const page = route.split("?")[0];
  const addToCart = (product) => {
    setCart((current) => [...current, product]);
    setCartOpen(true);
  };
  const removeFromCart = (targetIndex) => {
    setCart((current) => current.filter((_, index) => index !== targetIndex));
  };

  if (page === "checkout") return <Checkout />;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header cartCount={cart.length} openCart={() => setCartOpen(true)} />
      {page === "shop" ? <Shop addToCart={addToCart} /> : <Home addToCart={addToCart} />}
      <Footer />
      <CartDrawer cart={cart} open={cartOpen} close={() => setCartOpen(false)} go={go} removeFromCart={removeFromCart} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
