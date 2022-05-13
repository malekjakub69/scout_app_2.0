import React, { useEffect, useState } from "react";
import "./show-meets.scss";
import { useParams } from "react-router-dom";
import { AlignType } from "rc-table/lib/interface";
import axios from "../../../libs/api/base";
import { Table } from "antd";
import { ITroop } from "../../../libs/types/ITroop";
import Loading from "../../components/loading/loading";
import { IMeet, MeetType } from "../../../libs/types/IMeet";


function ShowMeets() {
  const { troop_id } = useParams<{ troop_id: string }>();

  const [meets, setMeets] = useState([] as IMeet[]);
  const [troop, setTroop] = useState({} as ITroop);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Název schůzky",
      dataIndex: "topic",
      key: "topic",
      align: "center" as AlignType,
    },
    {
      title: "Typ",
      dataIndex: "type",
      key: "type",
      align: "center" as AlignType,
      render: (text: MeetType) => {
        return text;
      }
    },
    {
      title: "datum schůzky",
      dataIndex: "date",
      key: "date",
      align: "center" as AlignType,
    },
    {
      title: "Počet záznamů",
      dataIndex: "count",
      key: "count",
      align: "center" as AlignType,
    }
  ];

  useEffect(() => {
    document.title = "Bodování - " + document.title;

    const fetchData = async () => {
      let url = "troop/getTroop.php?troop_id=" + troop_id;
      let response = await axios.get(url);
      setTroop(response.data.body);

      url = "meets/getMeetsWhereTroop.php?troop_id=" + troop_id;
      response = await axios.get(url);
      setMeets(response.data.body);
      setLoading(false);
    };
    fetchData();
  }, [troop_id]);

  if (loading || !meets) {
    return <Loading />;
  }

  return (
    <div className="ShowPoints">
      {" "}
      <h1>Schůzky {troop.number}. oddílu</h1>
      <div className="myTable">
        <Table
          rowClassName={(_, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
          columns={columns}
          dataSource={meets}
          size={"small"}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default ShowMeets;
