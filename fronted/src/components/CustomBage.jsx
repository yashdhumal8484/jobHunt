function CustomBadge({ className, children, ...props }) {
    return (
      <div
        className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  export default CustomBadge;
  