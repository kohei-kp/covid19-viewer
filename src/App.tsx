import { useEffect, useState } from 'react';
import { fetchCovid19 } from './api';
import GitHubCalendar from './components/GitHubCalendar';
// import PunchCard from './components/PunchCard';
// import DenseTable from './components/Table.tsx';

type item = {
  date: string;
  name_jp: string;
  npatients: string;
  npatients_day?: number;
};
type apiResponse = {
  errorInfo: any;
  itemList: item[];
};

const App = () => {
  const [covid19, setCovid19] = useState<item[]>([]);

  useEffect(() => {
    fetchCovid19().then((res: apiResponse) => {
      const itemList = res.itemList.map((item, i) => {
        if (i !== res.itemList.length - 1) {
          item.npatients_day =
            Number(item.npatients) - Number(res.itemList[i + 1].npatients);
        } else {
          item.npatients_day = 0;
        }
        return item;
      });

      setCovid19(
        itemList.sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return aDate.getTime() - bDate.getTime();
        }),
      );
    });
  }, []);

  return (
    <>
      <GitHubCalendar rows={covid19} />
    </>
  );
};

export default App;
