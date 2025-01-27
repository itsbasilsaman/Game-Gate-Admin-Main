import Breadcrumb from '../Breadcrumbs/Breadcrumb';
// import TableOne from '../Table/SubService';
import TableTwo from '../Table/TableTwo';
 


const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Service" />

      <div className="flex flex-col gap-10">
  
        <TableTwo/>
 
      </div>
    </>
  );
};

export default Tables;
