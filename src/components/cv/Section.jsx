const Section = ({ title, children }) => (
    <section className="flex flex-col gap-6 bg-gray-800 p-8 rounded-2xl shadow-md" id={title.toLowerCase().replace(/\s+/g, '-')}>
      <h2 className="text-2xl font-extrabold text-gray-100 mb-0">{title}</h2>
      {children}
    </section>
  );
  