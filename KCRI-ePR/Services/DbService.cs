using Microsoft.Data.SqlClient;
using System.Data;

namespace KCRI_ePR.Services
{
    public class DbService(IConfiguration configuration) : IDbService
    {
#pragma warning disable CS8601 // Possible null reference assignment.
        private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection");
#pragma warning restore CS8601 // Possible null reference assignment.
        public DataTable ExecuteSelectSP(string storedProcedure, params object[] parameters)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            using (SqlCommand command = new SqlCommand(storedProcedure, connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                AddParameters(command, parameters);

                DataTable dataTable = new DataTable();
                connection.Open();
                using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                {
                    adapter.Fill(dataTable);
                }
                return dataTable;
            }
        }
        public DataTable ExecuteSP(string storedProcedure, params object[] parameters)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                using (SqlCommand command = new SqlCommand(storedProcedure, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    AddParameters(command, parameters);

                    DataTable dataTable = new DataTable();
                    connection.Open();
                    using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                    {
                        adapter.Fill(dataTable);
                    }
                    return dataTable;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error executing stored procedure: " + ex.Message);
                throw;
            }
        }
        private void AddParameters(SqlCommand command, object[] parameters)
        {
            for (int i = 0; i < parameters.Length; i += 2)
            {
                if (parameters[i] is string paramName && i + 1 < parameters.Length)
                {
                    object paramValue = parameters[i + 1] ?? DBNull.Value;
                    command.Parameters.Add(new SqlParameter(paramName, paramValue));
                }
                else
                {
                    throw new ArgumentException("Parameters should be passed as name-value pairs.");
                }
            }
        }
        
    }
}
