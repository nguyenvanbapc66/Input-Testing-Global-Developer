import { Button, Input, Select, Spin } from 'antd';
import React, { useState } from 'react';
import { mutate } from 'swr';

import SelectCategory from '../components/home/select-category';
import { MainLayout } from '../layouts';
import { DetailCategriesType, homeApi } from '../services';
import { listDifficultyQuestion, listTypeQuestion } from './home-container.const';

const HomeContainer = () => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>(listDifficultyQuestion[0].key);
  const [type, setType] = useState<string>(listTypeQuestion[0].key);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [dataListCategories, setDataListCategories] = useState<DetailCategriesType[]>([]);

  const handleOnChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (isNaN(num)) return;
    setAmount(num);
  };

  const handleOnChangeDifficulty = (value: string) => {
    setDifficulty(value);
  };

  const handleOnChangeType = (value: string) => {
    setType(value);
  };

  const handleSubmit = () => {
    mutate('detailCategories', async () => {
      setLoading(true);
      try {
        const { results } = await homeApi.getDetailCategries({
          amount,
          category: Number(category),
          difficulty,
          type,
        });
        setDataListCategories(results);
      } catch (error) {}
      setLoading(false);
    });
  };

  return (
    <MainLayout>
      <h1 className="text-center text-white text-[24px] font-bold pt-[20px]">Quiz Test</h1>
      <div className="flex items-center justify-center gap-2">
        <Input placeholder="Amount Question" value={amount} onChange={handleOnChangeAmount} />
        <SelectCategory category={category} setCategory={setCategory} />
        <Select
          className="min-w-[250px]"
          defaultValue={!difficulty ? 'Any Difficulty' : difficulty}
          onChange={handleOnChangeDifficulty}>
          {listDifficultyQuestion.map(({ name, key }) => (
            <Select.Option key={key}>{name}</Select.Option>
          ))}
        </Select>
        <Select
          className="min-w-[250px]"
          defaultValue={!type ? 'Any Type' : type}
          onChange={handleOnChangeType}>
          {listTypeQuestion.map(({ name, key }) => (
            <Select.Option key={key}>{name}</Select.Option>
          ))}
        </Select>
      </div>
      <div>
        <Button onClick={handleSubmit} className="text-white">
          Submit
        </Button>
      </div>
      {dataListCategories.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Type</th>
              <th>Difficulty</th>
              <th>Question / Statement</th>
            </tr>
          </thead>
          <tbody>
            {dataListCategories.map(({ category, type, difficulty, question }) => (
              <tr>
                <td>{category}</td>
                <td>{type}</td>
                <td>{difficulty}</td>
                <td>{question}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spin />
        </div>
      )}
    </MainLayout>
  );
};

export default HomeContainer;
