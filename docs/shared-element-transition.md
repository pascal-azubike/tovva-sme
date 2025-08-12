# Shared Element Transition for App Logo

This project implements a smooth shared element transition for the Trovva logo using Framer Motion's `layoutId` feature. When navigating between pages, the logo smoothly animates from its position in the navbar to its new position above the authentication forms.

## How It Works

### 1. Shared Logo Component (`components/ui/shared-logo.tsx`)

The `SharedLogo` component uses Framer Motion's `layoutId="app-logo"` to create a shared element that can be animated between different positions and sizes.

**Key Features:**
- **`layoutId="app-logo"`**: This unique identifier allows Framer Motion to track the logo across route changes
- **Variant-based sizing**: Two size variants (`navbar` and `auth`) for different contexts
- **Spring animation**: Smooth, natural-feeling transitions with configurable stiffness and damping
- **Responsive design**: Automatically adjusts size based on screen size

### 2. AnimatePresence Setup (`app/layout.tsx`)

The root layout wraps all pages with `AnimatePresence` to handle enter/exit animations:

```tsx
<AnimatePresence mode="wait">
  {children}
</AnimatePresence>
```

**`mode="wait"`**: Ensures the exit animation of the current page completes before the enter animation of the new page begins.

### 3. Page Transitions (`components/ui/page-transition.tsx`)

Each page is wrapped with a `PageTransition` component that provides:
- **Enter animation**: Fade in from bottom with slight upward movement
- **Exit animation**: Fade out to top with slight upward movement
- **Spring physics**: Natural, bouncy feel using Framer Motion's spring animation

### 4. Implementation Across Pages

#### Home Page (`app/page.tsx`)
- Logo appears in navbar with `variant="navbar"` and `clickable={true}`
- Position: Top-left corner of the page

#### Login Page (`app/login/page.tsx`)
- Logo appears above the form with `variant="auth"`
- Position: Centered above the login form
- Smoothly animates from navbar position

#### Signup Page (`app/signup/page.tsx`)
- Logo appears above the form with `variant="auth"`
- Position: Centered above the signup form
- Smoothly animates from navbar position

#### Verify Email Page (`app/verify-email/page.tsx`)
- Logo appears above the verification form with `variant="auth"`
- Position: Centered above the verification form
- Smoothly animates from navbar position

## Animation Configuration

### Logo Transition
```tsx
transition={{
  type: "spring",
  stiffness: 300,    // Higher = faster, more bouncy
  damping: 30        // Lower = more oscillation
}}
```

### Page Transition
```tsx
transition={{
  type: "spring",
  stiffness: 300,
  damping: 30,
  duration: 0.3
}}
```

## Technical Details

### Framer Motion Features Used
- **`layoutId`**: Creates shared element references across components
- **`AnimatePresence`**: Handles component mount/unmount animations
- **Spring animations**: Natural, physics-based transitions
- **Layout animations**: Automatic position and size transitions

### Performance Considerations
- **Hardware acceleration**: Framer Motion automatically uses GPU acceleration
- **Efficient re-renders**: Only animates the shared element, not entire pages
- **Smooth 60fps**: Optimized for smooth animations

## Customization

### Changing Animation Speed
Modify the `stiffness` and `damping` values in the `SharedLogo` component:
- **Faster**: Increase `stiffness` (e.g., 400-500)
- **Slower**: Decrease `stiffness` (e.g., 200-250)
- **More bouncy**: Decrease `damping` (e.g., 20-25)
- **Less bouncy**: Increase `damping` (e.g., 35-40)

### Adding New Logo Variants
1. Add new variant to the `SharedLogoProps` interface
2. Define dimensions in the `dimensions` object
3. Update the className logic for responsive sizing

### Modifying Page Transitions
Adjust the `PageTransition` component's animation values:
- **Initial**: Starting position and opacity
- **Animate**: Final position and opacity
- **Exit**: Exit position and opacity
- **Transition**: Animation timing and easing

## Browser Support

- **Modern browsers**: Full support with hardware acceleration
- **Older browsers**: Graceful fallback to CSS transitions
- **Mobile**: Optimized for touch devices with reduced motion support

## Troubleshooting

### Logo Not Animating
1. Ensure `layoutId="app-logo"` is consistent across components
2. Check that `AnimatePresence` is properly set up in layout
3. Verify Framer Motion is installed and imported correctly

### Animation Performance Issues
1. Reduce `stiffness` and `damping` values
2. Check for heavy DOM operations during transitions
3. Ensure hardware acceleration is enabled

### TypeScript Errors
1. Verify all component props are properly typed
2. Check import statements for Framer Motion components
3. Ensure React types are up to date 