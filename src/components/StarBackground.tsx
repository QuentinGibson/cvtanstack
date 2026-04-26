import starIcon from '../star.svg';

export default function StarBackground() {
  return (
    // Hidden on mobile/tablet, visible on desktop (lg and up)
    // fixed inset-0 covers the whole screen, z-[-1] puts it behind content
    // pointer-events-none ensures it doesn't interfere with clicking links
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      
      {/* Top Edge Stars */}
      <div 
        className="absolute top-[20px] left-[20px] right-[20px] h-[100px] opacity-70"
        style={{ 
          backgroundImage: `url(${starIcon})`, 
          backgroundRepeat: 'space', 
          backgroundSize: '80px 80px',
          backgroundPosition: 'top center'
        }}
      />
      
      {/* Bottom Edge Stars */}
      <div 
        className="absolute bottom-[20px] left-[20px] right-[20px] h-[100px] opacity-70"
        style={{ 
          backgroundImage: `url(${starIcon})`, 
          backgroundRepeat: 'space', 
          backgroundSize: '80px 80px',
          backgroundPosition: 'bottom center'
        }}
      />

      {/* Left Edge Stars (spaced vertically) */}
      <div 
        className="absolute top-[120px] bottom-[120px] left-[20px] w-[100px] opacity-70"
        style={{ 
          backgroundImage: `url(${starIcon})`, 
          backgroundRepeat: 'space', 
          backgroundSize: '80px 80px',
          backgroundPosition: 'center left'
        }}
      />

      {/* Right Edge Stars (spaced vertically) */}
      <div 
        className="absolute top-[120px] bottom-[120px] right-[20px] w-[100px] opacity-70"
        style={{ 
          backgroundImage: `url(${starIcon})`, 
          backgroundRepeat: 'space', 
          backgroundSize: '80px 80px',
          backgroundPosition: 'center right'
        }}
      />
      
    </div>
  );
}
