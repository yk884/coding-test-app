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
        <label htmlFor="classification">進学</label>
        <br />
        <input
          type="radio"
          name="classification"
          value="2"
          onChange={handleRadioChange}
        />
        <label htmlFor="classification">就職</label>
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
        <label htmlFor="matter">
          {" "}
          地元{params.classification === 1 ? <>進学</> : <>就職</>}
        </label>
        <br />
        <input
          type="radio"
          name="matter"
          value="1"
          onChange={handleRadioChange}
        />
        <label htmlFor="matter">流出</label>
        <br />
        <input
          type="radio"
          name="matter"
          value="2"
          onChange={handleRadioChange}
        />
        <label htmlFor="matter">流入</label>
        <br />
        <input
          type="radio"
          name="matter"
          value="3"
          onChange={handleRadioChange}
        />
        <label htmlFor="matter">純流入</label>
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
            <label htmlFor="displayType">すべての大学</label>
            <br />
            <input
              type="radio"
              name="displayType"
              value="11"
              onChange={handleRadioChange}
            />
            <label htmlFor="displayType">大学進学</label>
            <br />
            <input
              type="radio"
              name="displayType"
              value="12"
              onChange={handleRadioChange}
            />
            <label htmlFor="displayType">短期大学進学</label>
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
            <label htmlFor="displayType">就職</label>
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
        <label htmlFor="gender">総数</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="1"
          onChange={handleRadioChange}
        />
        <label htmlFor="gender">男性</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="2"
          onChange={handleRadioChange}
        />
        <label htmlFor="gender">女性</label>
      </div>
    </div>
  );
};

export default Filter;
