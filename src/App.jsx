import { useState } from 'react'
import './styles/App.css'



function App() {

  const YOUR_API_KEY = ''; // Get your API key from https://www.weatherapi.com/

  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [error, setError] = useState('');


  const handleCityChange = (event) => {
    setCity(event.target.value)
  }


  const handleSearch = async () => {
    if (city === '') {
      setError('Digite o nome da cidade')
      return;
    }

    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${YOUR_API_KEY}&q=${city}&lang=pt`);

      const data = await response.json();
      setError('');
      console.log(data);
      setWeatherForecast(data)
    } catch (error) {
      setError('Cidade não encontrada');
    }
  }

  return (
    <>
      <div>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4' >

          <a className='navbar-brand text-white ' href='#top' >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cloud" viewBox="0 0 16 16">
              <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
            </svg> Thuin Wheater
          </a>
        </nav>

        <main className='container'>
          <div className='Jumbotron'>
            <h1>
              Pesquise pela cidade que deseja olhar a previsão
            </h1>
            <p className='lead'>
              Digite o nome da sua cidade no campo abaixo e clique em buscar!
            </p>

            <div className='row mb-4 ' >
              <div className='col-md-6'>

                <input className='form-control' type='text' value={city} placeholder='Ex: Passo Fundo' onChange={handleCityChange} />

              </div>
            </div>
            <button className='btn btn-dark btn-lg' onClick={handleSearch}>
              Buscar
            </button>

            {weatherForecast ? (
              <div>
                <div className='mt-4 d-flex align-items-center'>
                  <div>
                    <img src={weatherForecast.current.condition.icon} />
                  </div>
                  <div>
                    <h2>{`${weatherForecast.location.name} - ${weatherForecast.location.region}`}</h2>
                    <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
                    <p className='lead'>
                      Temperatura: {weatherForecast.current.temp_c}°C
                    </p>
                    <p className='lead'>
                    Sensação Térmica: {weatherForecast.current.feelslike_c}°C
                    </p>
                    
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className='mt-4'>{error}</h2>
              </div>
            )}
          </div>


        </main>
      </div>
    </>
  )
}

export default App
