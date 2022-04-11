import { useEffect, useState } from 'react';
import { fetchCovid19 } from './api';
import GitHubCalendar from './components/GitHubCalendar';
// import PunchCard from './components/PunchCard';
// import DenseTable from './components/Table.tsx';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export type item = {
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
  const [selectedYear, setYear] = useState<string>('2020');
  const [filteredCovid19, setFilteredCovid19] = useState<item[]>([]);

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
      console.log(covid19);
    });
  }, []);

  const style = {
    paddingTop: '20px',
  };
  const handleChange = (e: SelectChangeEvent) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    const filtered = covid19.filter((item) => {
      const date = new Date(item.date);
      return date.getFullYear() === Number(selectedYear);
    });

    setFilteredCovid19(filtered);
  }, [selectedYear]);

  return (
    <div style={style}>
      <InputLabel id="select-label">Year</InputLabel>
      <Select onChange={handleChange} value={selectedYear} label="2020">
        <MenuItem value="2020">2020</MenuItem>
        <MenuItem value="2021">2021</MenuItem>
        <MenuItem value="2022">2022</MenuItem>
      </Select>
      <GitHubCalendar rows={filteredCovid19} year={selectedYear} />
    </div>
  );
};

export default App;
