import sql from 'mssql';

const config = {
  user: 'sa',
  password: '12345', // <--- SSMS'te belirlediğin şifre (12345 mi 123 mü? Emin ol)
  server: 'localhost', 
  database: 'SevalKocaDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let poolPromise;

if (!global.poolPromise) {
  global.poolPromise = sql.connect(config)
    .then((pool) => {
      console.log('✅ Veritabanı Bağlantısı Başarılı');
      return pool;
    })
    .catch((err) => {
      console.error('❌ Veritabanı Bağlantı Hatası Detayı:', err);
      // Hatayı yutmayalım, fırlatalım ki tarayıcıda görebilelim
      throw err; 
    });
}

poolPromise = global.poolPromise;

export async function connectToDB() {
  return poolPromise;
}