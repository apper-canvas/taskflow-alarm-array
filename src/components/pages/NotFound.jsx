import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="MapPin" className="w-10 h-10 text-primary-500" />
        </div>
        
        <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. Let's get you back to your tasks.
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={() => navigate("/")}
            className="w-full"
            variant="primary"
          >
            <ApperIcon name="Home" className="w-4 h-4 mr-2" />
            Back to Tasks
          </Button>
          
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound