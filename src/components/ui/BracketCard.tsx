import React from 'react';

interface BracketCardProps {
  children: React.ReactNode;
  className?: string;
  color?: 'purple' | 'orange';
}

const BracketCard: React.FC<BracketCardProps> = ({ children, className = '', color = 'purple' }) => {
  const borderColor = color === 'purple' ? '#774CFC' : '#F26A3D';
  const size = '10px';

  const cornerStyle = (top?: boolean, bottom?: boolean, left?: boolean, right?: boolean): React.CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    borderColor,
    borderTopWidth: top ? '2px' : '0',
    borderBottomWidth: bottom ? '2px' : '0',
    borderLeftWidth: left ? '2px' : '0',
    borderRightWidth: right ? '2px' : '0',
    borderStyle: 'solid',
    ...(top !== undefined && left !== undefined ? { top: 8, left: 8 } : {}),
    ...(top !== undefined && right !== undefined ? { top: 8, right: 8 } : {}),
    ...(bottom !== undefined && left !== undefined ? { bottom: 8, left: 8 } : {}),
    ...(bottom !== undefined && right !== undefined ? { bottom: 8, right: 8 } : {}),
  });

  return (
    <div className={`relative ${className}`}>
      {/* Top-left */}
      <span style={{ position: 'absolute', width: size, height: size, top: 8, left: 8, borderTop: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}` }} />
      {/* Top-right */}
      <span style={{ position: 'absolute', width: size, height: size, top: 8, right: 8, borderTop: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}` }} />
      {/* Bottom-left */}
      <span style={{ position: 'absolute', width: size, height: size, bottom: 8, left: 8, borderBottom: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}` }} />
      {/* Bottom-right */}
      <span style={{ position: 'absolute', width: size, height: size, bottom: 8, right: 8, borderBottom: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}` }} />
      {children}
    </div>
  );
};

export default BracketCard;
