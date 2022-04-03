import { useEffect, useState } from 'react';
import { fetchCovid19 } from './api';
import PunchCard from './components/PunchCard';

type item = {
  date: string;
  name_jp: string;
  npatients: string;
};
type apiResponse = {
  errorInfo: any;
  itemList: item[];
};

const App = () => {
  const [covid19, setCovid19] = useState<item[]>([]);

  useEffect(() => {
    fetchCovid19().then((res: apiResponse) => {
      console.log(res);
      setCovid19(res.itemList);
    });
  }, []);

  return (
    <>
      <h1>Rainbow</h1>
      <PunchCard />
    </>
  );
};

export default App;
