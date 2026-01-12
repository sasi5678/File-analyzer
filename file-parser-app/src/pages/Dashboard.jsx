
import Card from "../components/Card";
import OverviewChart from "../components/OverviewChart";
import Table from "../components/Table";
import "../styles/Dashboard.css";
import SingleFileBar from "../components/SingleFileBar";
import FolderBar from "../components/FolderBar";
import ImportsTable from "../components/ImportsTable";


const Dashboard = ({ data }) => {
  
    const isSingleFile = data.totalFiles === 1;
    const files = data.files;



    const totalApis = data.files.reduce(
    (sum, f) => sum + f.apis.length,
    0
  );


  return (
  
  <>
  
    <h1 className="title-text"> Dashboard </h1>
    <main data-testid="dashboard-loaded" className="dashboard">

        
     
        <div className="card-box-1" >
            <Card title="Total Files" value={data.totalFiles} />
        </div>

        <div className="card-box-2" >
            <Card title="Total Lines" value={data.totalLines} />
        </div>

        <div className="card-box-3" >
            <Card title="Total APIs" value={totalApis} />
        </div>
    
      <div className="table-box">
          <Table data={data} />
      </div>

      <div className="table-import">
          <ImportsTable data={data} />
        </div>
    
    <div className="bar-chart">
      { isSingleFile ? (
            <SingleFileBar file={files[0]} />
          ) : (
            <FolderBar files={files} />
       )}
      
    </div>

    
     <div className="graph-chart">
      <h2 style={{ color: 'var(--color-title)', padding: '20px 28px'}}>Graph</h2>

      { isSingleFile ? (
            <OverviewChart data={files[0]} />
          ) : (
            <OverviewChart data={files} />
       )}
      
    </div>

   
    </main> 
  
  
  </>
 
  );
};

export default Dashboard;
