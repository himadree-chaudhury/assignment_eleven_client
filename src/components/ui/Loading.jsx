import { motion } from "framer-motion";

const Loading = ({ size = "medium", className = "" }) => {
  // Size variants
  const sizeClasses = {
    small: "h-8 w-8",
    medium: "h-12 w-12",
    large: "h-16 w-16",
    fullscreen: "h-32 w-32",
  };

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`relative ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent dark:border-blue-400 dark:border-t-transparent"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-blue-300 border-b-transparent dark:border-blue-200 dark:border-b-transparent"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Car icon (optional) */}
        {size !== "small" && (
          <motion.div
            className="absolute inset-4 flex items-center justify-center text-blue-600 dark:text-blue-300"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              width="60%"
              height="60%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 17H4C3.44772 17 3 16.5523 3 16V12C3 11.4477 3.44772 11 4 11H5M19 17H20C20.5523 17 21 16.5523 21 16V12C21 11.4477 20.5523 11 20 11H19M5 17V9C5 7.89543 5.89543 7 7 7H17C18.1046 7 19 7.89543 19 9V17M5 17H19M8 12H16M6.5 15C6.5 15.2761 6.27614 15.5 6 15.5C5.72386 15.5 5.5 15.2761 5.5 15C5.5 14.7239 5.72386 14.5 6 14.5C6.27614 14.5 6.5 14.7239 6.5 15ZM18.5 15C18.5 15.2761 18.2761 15.5 18 15.5C17.7239 15.5 17.5 15.2761 17.5 15C17.5 14.7239 17.7239 14.5 18 14.5C18.2761 14.5 18.5 14.7239 18.5 15Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Fullscreen loading page component
export const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="text-center">
        <Loading size="fullscreen" />
        <motion.p
          className="mt-6 text-lg font-medium text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Loading your ride options...
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
