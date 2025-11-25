import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class ClimateService {
  private readonly apiUrl = 'https://api.open-meteo.com/v1/forecast'; 
  
  constructor() {}

  // Função para obter dados climáticos
  async getClimateData(city: string): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          latitude: 40.7128, 
          longitude: -74.0060, 
          current_weather: 'true',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao coletar dados climáticos:', error);
      throw error;
    }
  }

  // Agendamento para coletar dados periodicamente (cada 1 hora, por exemplo)
  @Cron('0 0 * * * *') // A cada hora
  handleCron() {
    console.log('Coletando dados climáticos...');
    this.getClimateData('New York') 
    .then((data) => {
        console.log('Dados coletados:', data);
      })
      .catch((err) => {
        console.error('Erro ao coletar dados:', err);
      });
  }
}
