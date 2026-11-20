const NOTES = [
  {
    sticker: "/stickers/face.svg",
    place: "Heroes",
    line: "One sticker on the first screen, and the page stops looking like a template.",
  },
  {
    sticker: "/stickers/panda-bear-1.svg",
    place: "Empty states",
    line: "The blank screen gets a face. People poke it, then they stay.",
  },
  {
    sticker: "/stickers/panda-bear-1.svg",
    place: "Cards",
    line: "A small mark on a card is enough. It does not need a paragraph under it.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative mx-4 mb-10 sm:mx-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-[14ch] font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-zinc-900 sm:text-5xl">
          Where a sticker earns its place.
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {NOTES.map((note) => (
            <li
              key={note.place}
              className="flex flex-col rounded-3xl border border-zinc-200/80 bg-white p-6"
            >
              <img src={note.sticker} alt="" className="h-12 w-12" />
              <p className="mt-6 text-lg leading-snug text-zinc-900">{note.line}</p>
              <p className="mt-6 text-sm font-medium text-zinc-500">{note.place}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
