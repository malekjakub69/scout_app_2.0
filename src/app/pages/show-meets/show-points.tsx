import React, { useEffect, useState } from "react";
import "./show-points.scss";
import { useParams } from "react-router-dom";
import { AlignType } from "rc-table/lib/interface";
import axios from "../../../libs/api/base";
import { Table } from "antd";
import { ITroop } from "../../../libs/types/ITroop";
import { IShowPoints } from "../../../libs/types/IShowPoints";
import Loading from "../../components/loading/loading";

function ShowPoints() {
  const { troop_id } = useParams<{ troop_id: string }>();

  const [points, setPoints] = useState([] as IShowPoints[]);
  const [troop, setTroop] = useState({} as ITroop);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Název schůzky",
      dataIndex: "name",
      key: "name",
      align: "center" as AlignType,
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
      var url = "troop/getTroop.php?troop_id=" + troop_id;
      var response = await axios.get(url);
      var data = response.data;
      setTroop(data.body);

      url = "points/getMembersWithPoints.php?troop_id=" + troop_id;
      response = await axios.get(url);
      setPoints(response.data.body);
      setLoading(false);
    };
    fetchData();
  }, [troop_id]);

  if (loading || !points) {
    return <Loading />;
  }

  return (
    <div className="ShowPoints">
      {" "}
      <h1>Bodování {troop.number}. oddílu</h1>
      <div className="myTable">
        <Table
          rowClassName={(_, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
          columns={columns}
          dataSource={points}
          size={"small"}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default ShowPoints;
