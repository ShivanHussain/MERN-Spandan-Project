import ExportForm from "./ExportForm";
import SoloEventList from "./SoloEventList";

function App() {
  return (
    <div className="App min-h-screen">
      <div className="mt-8">
        <h1 className="text-white text-2xl font-bold flex justify-center">Admin Pannel</h1>
      </div>


      <ExportForm />

      <div className="text-white">
        <h1 className="text-2xl font-semibold flex justify-center">Some ApI to Get data</h1><br />
        <div className="flex justify-center">
          <ul class="list-disc list-inside text-white">
            <li>http://localhost:3000/api/v2/solo/admin/eventName/Solo Dance  </li><br/>
            <li>http://localhost:3000/api/v2/solo/admin/pid/P202500001</li><br/>
            <li>http://localhost:3000/api/v2/solo/admin/eventType/Solo Event</li><br/>
            <li>http://localhost:3000/api/v2/solo/admin/collegeName/SRMSCET</li><br/>
            <li>http://localhost:3000/api/v2/group/admin/getall</li><br/>
            <li>http://localhost:3000/api/v2/group/admin/tid/T202500001</li><br/>
            <li>http://localhost:3000/api/v2/group/admin/pid/P202500001</li><br/>
            <li>http://localhost:3000/api/v2/group/admin/eventName/Group Dance</li><br/>
            <li>http://localhost:3000/api/v2/group/admin/collegeName/SRMSCETR</li><br/>
            <li>http://localhost:3000/api/v2/group/admin/eventType/Group Event</li><br/>
          </ul>

        </div>


      </div>
    </div>
  );
}
export default App;