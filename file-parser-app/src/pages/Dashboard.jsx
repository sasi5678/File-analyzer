
import Card from "../components/Card";
import OverviewChart from "../components/OverviewChart";
import Table from "../components/Table";
import "../styles/Dashboard.css";
import SingleFileBar from "../components/SingleFileBar";
import FolderBar from "../components/FolderBar";


const Dashboard = ({ data }) => {
  
    const isSingleFile = data.totalFiles === 1;
    const files = data.files;



    const totalApis = data.files.reduce(
    (sum, f) => sum + f.apis.length,
    0
  );


  return (
    <main className="dashboard">
      <div style={{ display: "flex", gap: "20px" }}>
      <Card title="Total Files" value={data.totalFiles} />
      <Card title="Total Lines" value={data.totalLines} />
      <Card title="Total APIs" value={totalApis} />
      <OverviewChart analysisData={data}/>
    </div>
    <div className="bar-chart">
      { isSingleFile ? (
            <SingleFileBar file={files[0]} />
          ) : (
            <FolderBar files={files} />
       )}
      
    </div>

     <div className="graph-chart">
      { isSingleFile ? (
            <OverviewChart data={files[0]} />
          ) : (
            <OverviewChart data={files} />
       )}
      
    </div>

    <div className="table-stat">
      <Table data={data}/>
    </div>
    </main> 
  );
};

export default Dashboard;
