<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-section">
        <h4>About Us</h4>
        <p>Ecwid is your go-to shop for modern, sustainable, and comfortable clothing.</p>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#">Shop</a></li>
          <li><a href="#">New Arrivals</a></li>
          <li><a href="#">Best Sellers</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Follow Us</h4>
        <div class="social-icons">
          <a href="#"><svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="#3b5998"/><text x="12" y="16" font-size="12" fill="white" text-anchor="middle">f</text></svg></a>
          <a href="#"><svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="#00acee"/><text x="12" y="16" font-size="12" fill="white" text-anchor="middle">t</text></svg></a>
          <a href="#"><svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" fill="#E1306C"/><text x="12" y="16" font-size="12" fill="white" text-anchor="middle">i</text></svg></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 Ecwid. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f6f6f6;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.footer-section {
  flex: 1 1 250px;
  margin-right: 2rem;
}

.footer-section h4 {
  margin-bottom: 0.5rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin: 0.3rem 0;
}

.footer-section a {
  text-decoration: none;
  color: #333;
}

.social-icons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.footer-bottom {
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}
</style>