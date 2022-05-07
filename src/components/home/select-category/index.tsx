import { Select, SelectProps, Skeleton } from 'antd';
import { Dispatch, SetStateAction, useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';

import { homeApi } from '../../../services';

interface SelectCategoryProps extends SelectProps {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const SelectCategory = ({ category, setCategory, ...props }: SelectCategoryProps) => {
  const fetchListOptionsOfCategory = () => homeApi.getCategories();

  const { data, error } = useSWRImmutable('listOptionsOfCategoryHome', fetchListOptionsOfCategory);

  const isLoading = useMemo(() => !data && !error, [data, error]);

  const handleOnChange = (value: string) => {
    if (setCategory) {
      setCategory(value);
    }
  };

  return (
    <Select className="min-w-[250px]" value={category} onChange={handleOnChange} {...props}>
      {isLoading ? (
        <Select.Option key="loading" disabled>
          <Skeleton active />
        </Select.Option>
      ) : (
        <>
          <Select.Option key="">Any Category</Select.Option>
          {data?.trivia_categories.map(({ name, id }) => (
            <Select.Option key={id}>{name}</Select.Option>
          ))}
        </>
      )}
    </Select>
  );
};

export default SelectCategory;
