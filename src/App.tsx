// src/App.tsx
import React, { Fragment,  Suspense } from 'react';
import { Routes,Route  } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Loading } from './components/pages/Loading';
import { AdminLogin } from './components/forms/admin/login';
import { useSelector } from 'react-redux';
import { RootState } from './reduxKit/store';
import DefaultLayout from './layout/DefaultLayout';
import ECommerce from './components/pages/Dashboard/Ecommerce';
// import FormLayout from './components/pages/Form/FormLayout';
// import Tables from './components/pages/Table';
import SubServiceForm from './components/pages/Form/SubServiceForm';
import BrandData from './components/pages/Form/Brand';
import SubService from './components/Table/SubService';
import SellerList from './components/pages/seller/sellerList'
import BrandList from './components/Table/BrandList';
import ServiceListSection from './components/Table/ServiceListSection';
import AddService from './components/pages/Form/AddService';
import BrandDetail from './components/Table/BrandDetail';
import SellerListSection from './components/pages/seller/sellerList';
import SellerProfile from './components/Table/SellerProfile';
import ProductData from './components/pages/product/getProduct';


export const App: React.FC = React.memo(() => {
  const {isLogged,}=useSelector((state:RootState)=>state.auth)
  console.log("my role and my isLogged", isLogged);
  return (
    <Fragment>
      <Toaster position="top-center" />
      <Suspense fallback={<Loading />}> <Routes>  <Route path="/admin/login" element={ <AdminLogin/>} /> </Routes>
      <DefaultLayout> 
      <Routes>  <Route  index  element= { <ECommerce /> } /> 
    
      <Route path="/seller/sellerList" element={<>  <SellerList /></> }/>
 
        <Route  path="/brand" element={  <>  <BrandData/>  </>  } />
 
        <Route
          path="/addservice"
          element={
            <>
        
              <AddService/>
            </>
          }
        />

        

        <Route
          path="/brandAdd"
          element={
            <>
              <BrandData/>
            </>
          }
        />

        <Route
          path="/sellerlist"
          element={
            <>
              <SellerListSection/>
            </>
          }
        />

        <Route
          path="/sellerprofile"
          element={
            <>
              <SellerProfile/>
            </>
          }
        />

          <Route
          path="/subserviceform"
          element={
            <>
              <SubServiceForm/>
            </>
          }
        />

        <Route
          path="/productdata"
          element={
            <>
              <ProductData/>
            </>
          }
        />

        <Route
          path="/brandlist"
          element={
            <>
              <BrandList/>
            </>
          }
        />

        <Route
          path="/brand-detail"
          element={
            <>
              <BrandDetail/>
            </>
          }
        />

        <Route
          path="/servicelistsection"
          element={
            <>
               <ServiceListSection/>
            </>
          }
        />
        {/* <Route path="/settings"element={<>  <Settings />
            </>
          }
        />
        */}
        <Route
          path="/subservice"
          element={
             <SubService/>
          }
        />
        {/* <Route path="/settings"element={<>  <Settings />   </>  }  /> */}
        <Route  path="/subservice" element={  <SubService/>   }/> </Routes> <>
      </>
  </DefaultLayout>
      </Suspense>
    </Fragment>
  ); 
});