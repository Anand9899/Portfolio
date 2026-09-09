import { useState } from 'react'

// Available Code Tabs
type CodeTab = 'controller' | 'repository' | 'dbcontext' | 'sql'

/**
 * CodeShowcase Component - Clean Code & Enterprise Architecture Samples
 * Features:
 * - Live interactive code viewer demonstrating actual C# .NET 8 Web API, EF Core, and SQL Server implementation patterns
 * - Tabs for Controller, Repository Pattern, DbContext (Fluent API), and Stored Procedure
 * - Quality badges (SOLID Compliant, Async/Await, Dependency Injection, Parameterized SQL)
 */
function CodeShowcase() {
  // State for active code snippet tab
  const [activeTab, setActiveTab] = useState<CodeTab>('controller')

  // Code snippets data object
  const codeSnippets: Record<CodeTab, { title: string; filename: string; language: string; code: string; notes: string }> = {
    controller: {
      title: 'ASP.NET Core 8 Web API Controller',
      filename: 'Controllers/ProductsController.cs',
      language: 'csharp',
      notes: 'Clean controller utilizing Dependency Injection, Asynchronous operations, and structured ActionResult responses.',
      code: `[ApiController]
[Route("api/v1/[controller]")]
[Authorize(Roles = "Admin,Manager")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _repository;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(IProductRepository repository, ILogger<ProductsController> logger)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ProductDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllAsync([FromQuery] PaginationParams pagination)
    {
        var products = await _repository.GetPagedProductsAsync(pagination);
        return Ok(products);
    }

    [HttpPost]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateAsync([FromBody] CreateProductDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _repository.CreateAsync(dto);
        _logger.LogInformation("Product {Id} created successfully.", created.Id);

        return CreatedAtAction(nameof(GetByIdAsync), new { id = created.Id }, created);
    }
}`
    },
    repository: {
      title: 'Repository Pattern & EF Core Queries',
      filename: 'Repositories/ProductRepository.cs',
      language: 'csharp',
      notes: 'Decoupled data access layer using Entity Framework Core, LINQ to Entities, and AsNoTracking for fast reads.',
      code: `public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<ProductDto>> GetPagedProductsAsync(PaginationParams p)
    {
        var query = _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.IsActive);

        if (!string.IsNullOrWhiteSpace(p.SearchTerm))
        {
            query = query.Where(p => p.Name.Contains(p.SearchTerm) || p.Sku.Contains(p.SearchTerm));
        }

        var totalRecords = await query.CountAsync();
        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((p.PageNumber - 1) * p.PageSize)
            .Take(p.PageSize)
            .Select(p => new ProductDto(p.Id, p.Name, p.Price, p.Category.Name))
            .ToListAsync();

        return new PagedResult<ProductDto>(items, totalRecords, p.PageNumber, p.PageSize);
    }
}`
    },
    dbcontext: {
      title: 'EF Core DbContext & Fluent API',
      filename: 'Data/AppDbContext.cs',
      language: 'csharp',
      notes: 'Code-First database context with Fluent API configuration for relational constraints and indexing.',
      code: `public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Product entity configuration
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Price).HasPrecision(18, 2);
            entity.HasIndex(e => e.Sku).IsUnique();

            // 1-to-Many Relationship
            entity.HasOne(e => e.Category)
                  .WithMany(c => c.Products)
                  .HasForeignKey(e => e.CategoryId)
                  .OnDelete(DeleteBehavior.Restrict);
        });
    }
}`
    },
    sql: {
      title: 'SQL Server Stored Procedure & Schema',
      filename: 'Database/Scripts/GetRecruitmentAnalytics.sql',
      language: 'sql',
      notes: 'Optimized T-SQL stored procedure with CTEs, indexing awareness, and parameter handling.',
      code: `CREATE PROCEDURE dbo.sp_GetRecruitmentSummary
    @StartDate DATETIME2,
    @EndDate DATETIME2,
    @DepartmentId INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    WITH JobStats AS (
        SELECT 
            j.JobId,
            j.JobTitle,
            j.DepartmentId,
            COUNT(a.ApplicationId) AS TotalApplicants,
            SUM(CASE WHEN a.Status = 'Hired' THEN 1 ELSE 0 END) AS TotalHired
        FROM dbo.Jobs j
        LEFT JOIN dbo.Applications a ON j.JobId = a.JobId
        WHERE j.PostedDate BETWEEN @StartDate AND @EndDate
          AND (@DepartmentId IS NULL OR j.DepartmentId = @DepartmentId)
        GROUP BY j.JobId, j.JobTitle, j.DepartmentId
    )
    SELECT 
        js.JobId,
        js.JobTitle,
        d.DepartmentName,
        js.TotalApplicants,
        js.TotalHired,
        CAST((js.TotalHired * 100.0 / NULLIF(js.TotalApplicants, 0)) AS DECIMAL(5,2)) AS HireRatePercent
    FROM JobStats js
    INNER JOIN dbo.Departments d ON js.DepartmentId = d.DepartmentId
    ORDER BY js.TotalApplicants DESC;
END;`
    }
  }

  const current = codeSnippets[activeTab]

  return (
    <section id="code-showcase" className="section-wrapper code-showcase-section">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-tag">
          <span>05</span>
          <span className="tag-line"></span>
          <span>CLEAN CODE ARCHITECTURE</span>
        </div>
        <h2 className="section-title">
          Code <span>Samples</span>
        </h2>
        <p className="section-subtitle">
          A glimpse into how I structure enterprise .NET Web APIs, Entity Framework Core queries, and transactional database scripts.
        </p>
      </div>

      {/* Code Viewer Window */}
      <div className="code-viewer-container">
        {/* Navigation Tabs Bar */}
        <div className="code-tabs-bar">
          <button
            className={`code-tab ${activeTab === 'controller' ? 'active' : ''}`}
            onClick={() => setActiveTab('controller')}
          >
            <span className="tab-icon">⚡</span>
            <span>ProductsController.cs</span>
          </button>
          <button
            className={`code-tab ${activeTab === 'repository' ? 'active' : ''}`}
            onClick={() => setActiveTab('repository')}
          >
            <span className="tab-icon">🔷</span>
            <span>ProductRepository.cs</span>
          </button>
          <button
            className={`code-tab ${activeTab === 'dbcontext' ? 'active' : ''}`}
            onClick={() => setActiveTab('dbcontext')}
          >
            <span className="tab-icon">🔄</span>
            <span>AppDbContext.cs</span>
          </button>
          <button
            className={`code-tab ${activeTab === 'sql' ? 'active' : ''}`}
            onClick={() => setActiveTab('sql')}
          >
            <span className="tab-icon">🗄️</span>
            <span>RecruitmentAnalytics.sql</span>
          </button>
        </div>

        {/* Code View Body */}
        <div className="code-view-card">
          {/* Metadata Top Bar */}
          <div className="code-view-meta">
            <div className="meta-left">
              <span className="meta-badge">{current.language.toUpperCase()}</span>
              <span className="meta-filename font-mono">{current.filename}</span>
            </div>
            <div className="meta-right">
              <span className="meta-note">{current.notes}</span>
            </div>
          </div>

          {/* Formatted Code Block */}
          <pre className="code-display font-mono">
            <code>{current.code}</code>
          </pre>

          {/* Bottom Engineering Standards Badges */}
          <div className="code-card-bottom">
            <div className="standards-badges">
              <span>✓ SOLID Compliant</span>
              <span>✓ Async/Await</span>
              <span>✓ Dependency Injection</span>
              <span>✓ Parameterized SQL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CodeShowcase
