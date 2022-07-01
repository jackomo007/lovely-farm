const categories  = [
  {
    name: 'Featured ',
    description: 'All our awesome events',
    imageSrc: 'https://thumbs.dreamstime.com/b/right-here-now-neon-signs-style-text-vector-design-can-be-applied-all-fields-195767097.jpg',
    imageAlt: 'All our events.',
    href: '/events',
  },
  {
    name: 'Upcoming',
    description: 'Upcoming Events',
    imageSrc: 'http://jaidadbuilders.com/wp-content/uploads/2022/03/Upcoming-Events.jpg',
    imageAlt: 'Upcoming events to not miss.',
    href: '/events',
  },
]

export default function Index() {
  return (
    <div className="p-20 h-screen flex">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-100">Events</h2>

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
             {categories .map((category) => (
              <div key={category.name} className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={category.imageSrc}
                    alt={category.imageAlt}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500 hover:text-sky-400 hover:text-lg">
                  <a href={category.href}>
                    <span className="absolute inset-0" />
                      {category.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
