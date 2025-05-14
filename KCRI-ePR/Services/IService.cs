using System.Data;

namespace KCRI_ePR.Services
{
    public interface IService
    {
        Task<string> GetDocNumPR(string company);
    }
}
