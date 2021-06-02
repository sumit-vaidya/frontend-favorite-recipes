import { FC, useEffect, useState } from 'react';

export const DateTime: FC = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div>
      <p>
        {' '}
        Date {'&'} Time : {date.toLocaleDateString()}{' '}
        {date.toLocaleTimeString()}
      </p>
    </div>
  );
};
