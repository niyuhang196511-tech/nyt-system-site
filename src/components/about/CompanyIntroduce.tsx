interface IProps {
  title: string;
  descriptions: string[];
}

export default function CompanyIntroduce({ title, descriptions }: IProps) {
  return (
    <section className="mx-auto px-4 py-6 sm:px-6 sm:py-16 lg:px-28 xl:container xl:py-12">
      <div className="mb-12 sm:mb-16">
        <h1 className="mb-4 text-center text-xl font-bold text-foreground sm:text-4xl md:mb-6 md:text-2xl xl:text-3xl">
          {title}
        </h1>

        <div className="mx-auto max-w-4xl">
          {descriptions.map((paragraph, index) => (
            <p className="mb-5 indent-8 leading-8 md:leading-10" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
