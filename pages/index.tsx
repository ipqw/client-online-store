import { observer } from "mobx-react";
import { useEffect } from "react";
import { Page } from "../components/Page";
import { SearchPage } from "../components/SearchPage";
import { store } from "../store";
import { dataStore } from "../store/data";

const Home = observer(() => {
  useEffect(() => {
    store.checkAuth()
    dataStore.getDevices()
    dataStore.getBrands()
    dataStore.getTypes()
    dataStore.getCart()
  }, [])
  return (
    <Page>
      <SearchPage />
    </Page>
  )
})

export default Home