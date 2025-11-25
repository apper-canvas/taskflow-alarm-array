import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const ErrorView = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-error-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-700 mb-4">
          Oops! Something went wrong
        </h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          {message}
        </p>
        
        <div className="space-y-3">
          {onRetry && (
            <Button 
              onClick={onRetry}
              className="w-full"
              variant="primary"
            >
              <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorView