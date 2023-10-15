import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import logo from "../assets/images/logo.png";

function Assignment() {
  const [startDate, setStartDate] = useState({
    value: "",
    date: new Date(),
  });
  const [endDate, setEndDate] = useState({
    value: "",
    date: new Date(),
  });

  const [value, setValue] = useState(new Date());
  const [leadCount, setLeadCount] = useState("0");

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "StartDate",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "EndDate",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Month,Year",
      dataIndex: "monthYear",
      key: "monthYear",
    },
    {
      title: "DatesExcluded",
      dataIndex: "datesExcluded",
      key: "datesExcluded",
    },
    {
      title: "Number of days",
      dataIndex: "nodays",
      key: "nodays",
    },
    {
      title: "Lead Count",
      dataIndex: "leadCount",
      key: "leadCount",
    },
    {
      title: "Expected DDR",
      dataIndex: "expectedDDR",
      key: "expectedDDR",
    },
    {
      title: "Last Updated",
      dataIndex: "",
      key: "x",
      render: (_: any, record: any) => {
        if (record.showActions) {
          return (
            <div>
              <Button
                onClick={() => {
                  addData();
                }}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Save
              </Button>

              <Button style={{ backgroundColor: "red", color: "white" }}>
                Cancel
              </Button>
            </div>
          );
        } else {
          let now = Date();
          return <> {now}</>;
        }
      },
    },
  ];

  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    let newArr = [...data];

    newArr[0] = {
      key: "1",
      action: "N/A",
      id: "N/A",
      startDate: (
        <input
          type="date"
          onChange={(e) => {
            const inputDate = new Date(e.target.value);
            setStartDate({ value: e.target.value, date: inputDate });
          }}
        />
      ),
      endDate: (
        <input
          type="date"
          onChange={(e) => {
            const inputDate = new Date(e.target.value);
            setEndDate({ value: e.target.value, date: inputDate });
          }}
        />
      ),
      monthYear: "",
      datesExcluded: (
        <DatePicker
          multiple
          value={value}
          minDate={startDate.date}
          maxDate={endDate.date}
          onChange={(date: DateObject | DateObject[] | null) =>
            setValue(date as unknown as Date)
          }
        />
      ),
      nodays: 1,
      leadCount: (
        <input
          placeholder={leadCount}
          onChange={(e) => {
            setLeadCount(e.target.value);
          }}
        ></input>
      ),
      expectedDDR: 0,
      showActions: true,
    };
    setData(newArr);
  }, [startDate, endDate]);
  function addData() {
    var diff = Math.abs(startDate.date.getTime() - endDate.date.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    diffDays -= Object.values(value).length;

    setData((data) => [
      ...data,
      {
        //   key: "2",
        action: "",
        id: data[0].id == "N/A" ? 1 : data[0].id + 1,
        startDate: startDate.value,
        endDate: endDate.value,
        monthYear: startDate.date.getMonth() + 1,
        datesExcluded: value.toString(),
        nodays: diffDays,
        leadCount: leadCount,
        expectedDDR: Number(leadCount) / diffDays,
        showActions: false,
      },
    ]);
  }
  return (
    <div>
      <img src={logo}></img>
      <h1>Daily Run Rate Report </h1>
      <Table columns={columns} dataSource={data}></Table>
    </div>
  );
}
export default Assignment;
