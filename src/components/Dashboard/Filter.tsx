import React from "react";

type FilterProps = {
  params: any;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Filter: React.FC<FilterProps> = ({ params, handleRadioChange }) => {
  return (
    <div className="filter">
      <div className="filterContent classification">
        <h4>表示分類</h4>
        <input
          type="radio"
          name="classification"
          value="1"
          onChange={handleRadioChange}
          required
          checked={params.classification === 1}
        />
        進学
        <br />
        <input
          type="radio"
          name="classification"
          value="2"
          onChange={handleRadioChange}
        />
        就職
      </div>
      <div className="filterContent matter">
        <h4>表示内容</h4>
        <input
          type="radio"
          name="matter"
          value="0"
          onChange={handleRadioChange}
          checked={params.matter === 0}
        />
        地元{params.classification === 1 ? <>進学</> : <>就職</>}
        <br />
        <input
          type="radio"
          name="matter"
          value="1"
          onChange={handleRadioChange}
        />
        流出
        <br />
        <input
          type="radio"
          name="matter"
          value="2"
          onChange={handleRadioChange}
        />
        流入
        <br />
        <input
          type="radio"
          name="matter"
          value="3"
          onChange={handleRadioChange}
        />
        純流入
      </div>
      <div className="filterContent displayType">
        <h4>表示区分</h4>
        {params.classification === 1 && (
          <>
            <input
              type="radio"
              name="displayType"
              value="10"
              onChange={handleRadioChange}
              checked={params.displayType === 10}
            />
            すべての大学
            <br />
            <input
              type="radio"
              name="displayType"
              value="11"
              onChange={handleRadioChange}
            />
            大学進学
            <br />
            <input
              type="radio"
              name="displayType"
              value="12"
              onChange={handleRadioChange}
            />
            短期大学進学
            <br />
          </>
        )}
        {params.classification === 2 && (
          <>
            <input
              type="radio"
              name="displayType"
              value="20"
              onChange={handleRadioChange}
              checked={params.displayType === 20}
            />
            就職
          </>
        )}
      </div>
      <div className="filterContent gender">
        <h4>性別</h4>
        <input
          type="radio"
          name="gender"
          value="0"
          required
          onChange={handleRadioChange}
          checked={params.gender === 0}
        />
        総数
        <br />
        <input
          type="radio"
          name="gender"
          value="1"
          onChange={handleRadioChange}
        />
        男性
        <br />
        <input
          type="radio"
          name="gender"
          value="2"
          onChange={handleRadioChange}
        />
        女性
      </div>
    </div>
  );
};

export default Filter;
