type FeatureProps = {
    icon: React.ReactNode
    title: string
    description: string
  }
  
  export default function Feature({ icon, title, description }: FeatureProps) {
    return (
      <div className="text-center p-4">
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    )
  }