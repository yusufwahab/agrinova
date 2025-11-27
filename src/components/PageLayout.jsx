import { motion } from 'framer-motion';

const PageLayout = ({ 
  children, 
  title, 
  description, 
  action = null,
  className = '' 
}) => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        {(title || action) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                {title && (
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-gray-600 mt-2 text-base sm:text-lg">
                    {description}
                  </p>
                )}
              </div>
              {action && (
                <div className="flex gap-3">
                  {action}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`space-y-6 ${className}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default PageLayout;
