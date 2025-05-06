using System.Data;

namespace KCRI_ePR.Services
{
    public interface IDbService
    {
        DataTable ExecuteSelectSP(string storedProcedure, params object[] parameters);
        DataTable ExecuteSP(string storedProcedure, params object[] parameters);
    }
}
